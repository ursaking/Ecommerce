<?php

namespace App\Controller;

use App\Document\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;



class SecurityController extends AbstractController
{
	private $user;

	public function __construct()
	{
		$this->user = new User();
	}

	/**
	 * @Route("/api/login",methods={"POST"}, name="api_login")
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return JsonResponse|Response
	 */
	public function login(Request $request, DocumentManager $dm)
	{
		$postData = json_decode($request->getContent(), true);
		if ($postData) {
			$this->user = $dm->getRepository('App:User')
				->findOneByEmail($postData['email']);
			
			if ($this->user && password_verify($postData['password'], $this->user->getPassword())) {
				$this->user->setApiToken($this->user->makeToken());
				$dm->persist($this->user);
				$dm->flush();
				return $this->user->parseResponse($this->user);
			}
			return new JsonResponse(["error" => "Bad email or password ."]);
		}
	}

	/**
	 * @Route("/api/register",methods={"POST"}, name="api_register")
	 * @param Request 						$request
	 * @param UserPasswordEncoderInterface	$encoder
	 * @param DocumentManager				$dm
	 *
	 * @return JsonResponse
	 */
	public function register(Request $request, UserPasswordEncoderInterface $encoder, DocumentManager $dm)
	{
		$postData = json_decode($request->getContent(), true);
		if ($postData) {
			if ($dm->getRepository('App:User')->findOneByEmail($postData['email'])) {
				return new JsonResponse(["type" => "error", "message" => "An account already exist with this email"]);
			}
			$this->user->setEmail($postData['email'])
			->setPassword($encoder->encodePassword($this->user, $postData['password']))
			->setApiToken($this->user->makeToken())
			->setFirstname($postData['firstname'])
			->setLastname($postData['lastname'])
			->setRoles(["ROLE_USER"])
			->addAddress($postData['address']);

			$dm->persist($this->user);
			$dm->flush();

			return new JsonResponse(["message" => "Registration Successful !"]);
		}
	}
}