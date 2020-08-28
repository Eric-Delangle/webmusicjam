<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;


 /**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 * attributes={
 *      "pagination_enabled" = false
 * },
 *  collectionOperations={"GET", "POST"},
 *  itemOperations={"GET", "PUT"},
 *  normalizationContext={
 *      "groups"={"user_read", "style_read", "instrument_read"},"enable_max_depth" = true,
 *  },
 * denormalizationContext={"groups"={"style_read", "user_read"}},
 * )
 */

class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=false)
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $city;

    /**
     * @ORM\ManyToMany(targetEntity=Instrument::class, inversedBy="user",cascade={"persist"})
     * @Groups({ "style_read","user_read" })
     */
    private $instruments;

    /**
     * @ORM\ManyToMany(targetEntity=Style::class, inversedBy="user" ,cascade={"persist"})
     * @ORM\JoinColumn(onDelete="SET NULL")
     * @Groups({"style_read","user_read" })
     */
    private $styles ;

    /**
     *  @ORM\Column(type="string")
     * @Groups({"user_read", "instrument_read", "style_read"})
     */
    private $experience;

    public function __construct()
    {
        $this->instruments = new ArrayCollection();
        $this->styles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->firstName;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }
    /**
     * Get the value of instruments
     */ 
    public function getInstruments()
    {
        return $this->instruments;
    }

    /**
     * Set the value of instruments
     *
     * @return  self
     */ 
    public function setInstruments($instruments)
    {
        $this->instruments = $instruments;

        return $this;
    }

    /**
     * Get the value of styles
     */ 
    public function getStyles()
    {
        return $this->styles;
    }

    /**
     * Set the value of styles
     *
     * @return  self
     */ 
    public function setStyles($styles)
    {
        $this->styles = $styles;

        return $this;
    }

    /**
     * Get the value of experience
     */ 
    public function getExperience()
    {
        return $this->experience;
    }

    /**
     * Set the value of experience
     *
     * @return  self
     */ 
    public function setExperience($experience)
    {
        $this->experience = $experience;

        return $this;
    }
}
