<?php

namespace App\Controller;

use App\Controller\TokenAuthenticatedController;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController implements TokenAuthenticatedController
{
	/**
	 * @Route("/api/user", name="user")
	 */
	public function index(Request $request, DocumentManager $dm)
	{
		$user = $dm->getRepository('App:User')
			->findOneByApiToken($request->get('token'));

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/address/new", name="user_new_address", methods={"POST"})
	 */
	public function userNewAddress(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user->addAddress($postData['address']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/address/remove", name="user_remove_address", methods={"POST"})
	 */
	public function userRemoveAddress(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user->removeAddress($postData['address']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/address/edit", name="user_edit_address", methods={"POST"})
	 */
	public function userEditAddress(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user = $user->editAddress($postData['address']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/card/new", name="user_new_card", methods={"POST"})
	 */
	public function userNewCreditCard(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user->addCard($postData['card']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/card/remove", name="user_remove_card", methods={"POST"})
	 */
	public function userRemoveCreditCard(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user->removeCard($postData['card']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/user/card/edit", name="user_edit_card", methods={"POST"})
	 */
	public function userEditCard(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		$user = $user->editCard($postData['card']);

		$dm->persist($user);
		$dm->flush();

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}
}
