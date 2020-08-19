<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InstrumentRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=InstrumentRepository::class)
 * @ApiResource
 */
class Instrument
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({ "style_read", "user_read", "instrument_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({ "style_read", "user_read", "instrument_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="instrument",cascade={"persist"})
     */
    private $user;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
