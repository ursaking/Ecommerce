<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource
 * @MongoDB\Document
 */
class Order
{
	/**
	 * @MongoDB\Id
	 */
	protected $id;
	
	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $user;
	
	/**
	 * @MongoDB\Field(type="date")
	 */
	protected $date;

	/**
	 * @MongoDB\Field(type="collection")
	 */
	protected $components = [];

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $status;

	/**
	 * @MongoDB\Field(type="int")
	 */
	protected $price;

	public function __construct()
	{
		$this->serializer = new Serializer(
			[new ObjectNormalizer()],
			[new XmlEncoder(), new JsonEncoder()]);
	}

	/**
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @param mixed $id
	 *
	 * @return self
	 */
	public function setId($id)
	{
		$this->id = $id;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getUser()
	{
		return $this->user;
	}

	/**
	 * @param mixed $user
	 *
	 * @return self
	 */
	public function setUser($user)
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getComponents()
	{
		return $this->components;
	}

	/**
	 * @param mixed $components
	 *
	 * @return self
	 */
	public function setComponents($components)
	{
		$this->components[] = $components;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getPrice()
	{
		return $this->price;
	}

	/**
	 * @param mixed $price
	 *
	 * @return self
	 */
	public function setPrice($price)
	{
		$this->price = $price;

		return $this;
	}

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     *
     * @return self
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     *
     * @return self
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }
}
