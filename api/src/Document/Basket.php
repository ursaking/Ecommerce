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
class Basket
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
	 * @MongoDB\Field(type="collection")
	 */
	protected $components = [];

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
	 * @param mixed $component
	 * @param int 	$price
	 *
	 * @return self
	 */
	public function addBasket($component, $price)
	{
		foreach ($this->components as $key => $value) {
			if (isset($value["id"]) && $value["id"] == $component ) {
				$this->components[$key]["nb"]++;
				$this->price += $price;
				return $this;
			}
		}

		$this->components[] = [
			"id" => $component,
			"nb" => 1,
		];
		$this->price += $price;

		return $this;
	}

	/**
	 * @param mixed $component
	 * @param int 	$price
	 *
	 * @return self
	 */
	public function removeBasket($component, $price)
	{
		foreach ($this->components as $key => $value) {
			if (isset($value["id"]) && $value["id"] == $component ) {
				$this->components[$key]["nb"]--;
				$this->price -= $price;
				if ($this->components[$key]["nb"] <= 0) {
					unset($this->components[$key]);
				}
				return $this;
			}
		}

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
}