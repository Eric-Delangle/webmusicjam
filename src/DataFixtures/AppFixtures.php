<?php

namespace App\DataFixtures;

use DateTime;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Instrument;
use App\Entity\Style;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Common\Collections\Collection;


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

        $styleCat = ['Rock', 'Reggae', 'Funk', 'Pop', 'Jazz', 'Rap','Métal'];
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

                foreach ($instrumentCategories as $instrumentCategory) {
                    $user->getInstrument($instrumentCategories)->add($instrumentCategory);
                }
          
                foreach ($styleCategories as $styleCategory) {
                    $user->getStyle($styleCategories)->add($styleCategory);
                }
            $manager->persist($user);
        }
        $manager->flush();
    }
}
