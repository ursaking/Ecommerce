<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
// use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @MongoDB\Document
 */
class Component
{
	/**
	 * @MongoDB\Id
	 */
	protected $id;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $label;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $sublabel;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $brand;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $img60x60;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $img200x200;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $img500x500;

	/**
	 * @MongoDB\Field(type="collection")
	 */
	protected $sort_value;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $type;


	public function __construct()
	{
		$this->serializer =  new Serializer(
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

	public function parseResponse(User $user): Response
	{
		$data = $this->serializer->serialize($user, 'json');
		$data = json_decode($data, true);
		unset($data['password']);
		unset($data['salt']);
		$data = json_encode($data);
		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

    /**
     * @return mixed
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param mixed $label
     *
     * @return self
     */
    public function setLabel($label)
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSublabel()
    {
        return $this->sublabel;
    }

    /**
     * @param mixed $sublabel
     *
     * @return self
     */
    public function setSublabel($sublabel)
    {
        $this->sublabel = $sublabel;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * @param mixed $brand
     *
     * @return self
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImg60x60()
    {
        return $this->img60x60;
    }

    /**
     * @param mixed $img60x60
     *
     * @return self
     */
    public function setImg60x60($img60x60)
    {
        $this->img60x60 = $img60x60;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImg200x200()
    {
        return $this->img200x200;
    }

    /**
     * @param mixed $img200x200
     *
     * @return self
     */
    public function setImg200x200($img200x200)
    {
        $this->img200x200 = $img200x200;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImg500x500()
    {
        return $this->img500x500;
    }

    /**
     * @param mixed $img500x500
     *
     * @return self
     */
    public function setImg500x500($img500x500)
    {
        $this->img500x500 = $img500x500;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSortValue()
    {
        return $this->sort_value;
    }

    /**
     * @param mixed $sort_value
     *
     * @return self
     */
    public function setSortValue($sort_value)
    {
        $this->sort_value = $sort_value;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     *
     * @return self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }
}