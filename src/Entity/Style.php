<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\StyleRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=StyleRepository::class)
 *  @ApiResource(
 *  attributes={
 *      "pagination_enabled" = true
 * },
 *  collectionOperations={"GET", "POST"},
 *  itemOperations={"GET", "PUT"},
 *  normalizationContext ={
 *      "groups" = {"style_read", "user_read"},"enable_max_depth" = true,
 * },
 * denormalizationContext={"groups"={"style_read", "user_read"}},
 * )
 */


class Style
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "user_read", "instrument_read", "style_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({ "user_read", "instrument_read", "style_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="style",cascade={"persist"})
     */
    private $user;


    public function __construct()
    {
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    public function __toString()
    {
        return (string) $this->getName();
    }
}
