<?php

namespace App\DataFixtures;

use DateTime;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Instrument;
use App\Entity\Style;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /** 
     *  Encodeur des mots de passe
     * 
     * @var UserPasswordEncoderInterface
     */

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $styleCat = ['Rock', 'Reggae', 'Funk', 'Pop', 'Jazz', 'Rap'];
        $instrumentCat = ['Guitare', 'Basse', 'Batterie', 'Piano', 'Chant'];
       

        // je creer mes catégories de styles
        foreach ($styleCat as $name) {
            $style = new Style();
            $style->setName($name);
            $manager->persist($style);
            $styleCategories[] = $style;
        }

        // je creer mes catégories d'instruments
        foreach ($instrumentCat as $name) {
            $instrument = new Instrument();
            $instrument->setName($name);
            $manager->persist($instrument);
            $instrumentCategories[] = $instrument;
        }

        // je veux des users
        for ($u = 0; $u < 100; $u++) {
            $user = new User();
            $hash = $this->encoder->encodePassword($user, 'password');
            $user->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setCity($faker->city)
                ->setPassword($hash)
                ->setEmail($faker->email)
                ->setExperience($faker->randomDigit() );

                /*
                // je tente d'avoir aleatoirement 1 a 5 styles par user
                for($s = 0; $s <  mt_rand(1, 5); $s++){
                    $style = new Style();
                    $style->setName($faker->randomElement( $styleCat));
                    $user->addStyle($this->$style->getName());
                    $manager->persist($style);
                }

                 // je tente d'avoir aleatoirement 1 a 5 instruments par user
                 for($i = 0; $i <  mt_rand(1, 5); $i++){
                    $instrument = new Instrument();
                    $instrument->setName($faker->randomElement( $instrumentCat));
                    $user->addInstrument($this->instrument->getName());
                    $manager->persist($instrument);
                }
     */
                
                foreach ($styleCategories as $styleCategory) {
                    $user->getStyles($styleCategories)->add($styleCategory);
                }

                foreach ($instrumentCategories as $instrumentCategory) {
                    $user->getInstruments($instrumentCategories)->add($instrumentCategory);
                }

            $manager->persist($user);
        }
        $manager->flush();
    }
}
