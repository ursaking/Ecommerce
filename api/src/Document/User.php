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
class User implements UserInterface
{
	/**
	 * @MongoDB\Id
	 */
	protected $id;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $firstname;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $lastname;

	/**
	* @MongoDB\Field(type="collection")
	*/
	protected $addresses;

	/**
	* @MongoDB\Field(type="collection")
	*/
	protected $cards;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $email;

	/**
	 * @MongoDB\Field(type="string")
	 */
	protected $password;

	/**
	 * @MongoDB\Field(type="date")
	 */
	protected $create_date;

	/**
	* @MongoDB\Field(type="collection")
	*/
	protected $roles;

	/**
	* @MongoDB\Field(type="string")
	*/
	protected $apiToken;


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
	public function getFirstname()
	{
		return $this->firstname;
	}

	/**
	 * @param mixed $firstname
	 *
	 * @return self
	 */
	public function setFirstname($firstname)
	{
		$this->firstname = $firstname;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getLastname()
	{
		return $this->lastname;
	}

	/**
	 * @param mixed $lastname
	 *
	 * @return self
	 */
	public function setLastname($lastname)
	{
		$this->lastname = $lastname;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * @param mixed $email
	 *
	 * @return self
	 */
	public function setEmail($email)
	{
		$this->email = $email;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getPassword()
	{
		return $this->password;
	}

	/**
	 * @param mixed $password
	 *
	 * @return self
	 */
	public function setPassword($password)
	{
		$this->password = $password;

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getCreateDate()
	{
		return $this->create_date;
	}

	/**
	 * @param mixed $create_date
	 *
	 * @return self
	 */
	public function setCreateDate($create_date)
	{
		$this->create_date = $create_date;

		return $this;
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

	/**
	 * A visual identifier that represents this user.
	 *
	 * @see UserInterface
	 */
	public function getUsername(): string
	{
		return (string) $this->email;
	}

	/**
	 * @return mixed
	 */
	public function getAddresses()
	{
		return $this->addresses;
	}

	/**
	 * @param mixed $addresses
	 *
	 * @return self
	 */
	public function setAddresses($addresses)
	{
		$this->addresses = $addresses;

		return $this;
	}
	
	/**
	 * @param mixed $address
	 *
	 * @return self
	 */
	public function addAddress($address)
	{
		$address['id'] = md5(mt_rand(1, 9999));
		$this->addresses[] = $address;

		return $this;
	}
	
	/**
	 * @param mixed $address
	 *
	 * @return self
	 */
	public function editAddress($address)
	{
		foreach ($this->addresses as $key => $value) {
			if ($value['id'] == $address['id']) {
				$this->addresses[$key] = $address;
				return $this;
			}
		}

		return $this;
	}
	
	/**
	 * @param mixed $address
	 *
	 * @return self
	 */
	public function removeAddress($addressId)
	{
		foreach ($this->addresses as $key => $address) {
			if ($address['id'] == $addressId) {
				unset($this->addresses[$key]);
				return $this;
			}
		}

		return $this;
	}

	/**
	 * @return mixed
	 */
	public function getApiToken()
	{
		return $this->apiToken;
	}

	/**
	 * @param mixed $apiToken
	 *
	 * @return self
	 */
	public function setApiToken($apiToken)
	{
		$this->apiToken = $apiToken;

		return $this;
	}

	public function parseResponse(User $user): Response
	{
		$this->serializer = new Serializer(
			[new ObjectNormalizer()],
			[new XmlEncoder(), new JsonEncoder()]);

		$data = $this->serializer->serialize($user, 'json');
		$data = json_decode($data, true);
		unset($data['password']);
		unset($data['cards']);
		unset($data['salt']);
		$data = json_encode($data);
		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	public function makeToken()
	{
		return strtoupper(hash('sha256', mt_rand(1, 5555)));
	}

	/**
	 * @return mixed
	 */
	public function getCards()
	{
		return $this->cards;
	}

	/**
	 * @param mixed $cards
	 *
	 * @return self
	 */
	public function setCards($cards)
	{
		$this->cards = $cards;

		return $this;
	}
	
	/**
	 * @param mixed $card
	 *
	 * @return self
	 */
	public function addCard($card)
	{
		$card['id'] = md5(mt_rand(1, 9999));
		$this->cards[] = $card;

		return $this;
	}
	
	/**
	 * @param mixed $card
	 *
	 * @return self
	 */
	public function editCard($card)
	{
		foreach ($this->cards as $key => $value) {
			if ($value['id'] == $card['id']) {
				$this->cards[$key] = $card;
				return $this;
			}
		}

		return $this;
	}
	
	/**
	 * @param mixed $card
	 *
	 * @return self
	 */
	public function removecard($cardId)
	{
		foreach ($this->cards as $key => $card) {
			if ($card['id'] == $cardId) {
				unset($this->cards[$key]);
				return $this;
			}
		}

		return $this;
	}
}