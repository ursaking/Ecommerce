<?php

namespace App\Controller;

use App\Controller\AdminAuthenticatedController;
use App\Document\Component;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/admin", name="admin")
 */
class AdminController extends AbstractController implements AdminAuthenticatedController
{
	/**
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/components", name="admin_component_index", methods={"GET"})
	 */
	public function componentsIndex(DocumentManager $dm): Response
	{
		$components = $dm->getRepository('App:Component')
			->findAll();

		$data = $this->get('serializer')->serialize($components, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}


	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/components", name="admin_component_new", methods={"POST"})
	 */

	public function componentCreate(Request $request, DocumentManager $dm): Response
	{
		$component = new Component();
		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$component->setLabel($postData['label'])
				->setSublabel($postData['sublabel'])
				->setBrand($postData['brand'])
				->setImg60x60($postData['img60x60'])
				->setImg200x200($postData['img200x200'])
				->setImg500x500($postData['img500x500'])
				->setSortValue($postData['sortValue'])
				->setType($postData['type']);

				$dm->persist($component);
				$dm->flush();
		}
		$data = $this->get('serializer')->serialize($component, 'json');


		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/components/{id}", name="admin_component_view", methods={"GET"})
	 */
	public function componentView(DocumentManager $dm, $id): Response
	{
		$component = $dm->getRepository('App:Component')
			->find($id);

		$data = $this->get('serializer')->serialize($component, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/components/{id}", name="admin_component_edit", methods={"POST", "PUT"})
	 */
	public function componentEdit(Request $request, DocumentManager $dm, $id): Response
	{
		$component = $dm->getRepository('App:Component')
			->find($id);

		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$component->setLabel($postData['label'])
				->setSublabel($postData['sublabel'])
				->setBrand($postData['brand'])
				->setImg60x60($postData['img60x60'])
				->setImg200x200($postData['img200x200'])
				->setImg500x500($postData['img500x500'])
				->setSortValue($postData['sortValue'])
				->setType($postData['type']);

				$dm->persist($component);
				$dm->flush();
		}

		$data = $this->get('serializer')->serialize($component, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/components/{id}", name="admin_component_delete", methods={"DELETE"})
	 */
	public function componentDelete(Request $request, DocumentManager $dm, $id): Response
	{
		$component = $dm->getRepository('App:Component')
			->find($id);

		$dm->remove($component);
		$dm->flush();

		return $this->json([
			"type" => "success",
			"message" => "Entry successfully deleted !",
		]);
	}

	/**
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/users", name="admin_user_index", methods={"GET"})
	 */
	public function usersIndex(DocumentManager $dm): Response
	{
		$users = $dm->getRepository('App:User')
			->findAll();

		$data = $this->get('serializer')->serialize($users, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}


	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/users", name="admin_user_new", methods={"POST"})
	 */
	public function userCreate(Request $request, DocumentManager $dm, UserPasswordEncoderInterface $encoder): Response
	{
		$user = new User();
		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$user->setEmail($postData['email'])
				->setPassword($encoder->encodePassword($user, $postData['password']))
				->setApiToken($user->makeToken())
				->setFirstname($postData['firstname'])
				->setLastname($postData['lastname'])
				->setCountry($postData['country'])
				->setRoles($postData['roles']);

				$dm->persist($user);
				$dm->flush();
		}
		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/users/{id}", name="admin_user_view", methods={"GET"})
	 */
	public function userView(DocumentManager $dm, $id): Response
	{
		$user = $dm->getRepository('App:User')
			->find($id);

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/users/{id}", name="admin_user_edit", methods={"POST", "PUT"})
	 */
	public function userEdit(Request $request, DocumentManager $dm, $id): Response
	{
		$user = $dm->getRepository('App:User')
			->find($id);

		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$user->setEmail($postData['email'])
				->setPassword($encoder->encodePassword($user, $postData['password']))
				->setApiToken($user->makeToken())
				->setFirstname($postData['firstname'])
				->setLastname($postData['lastname'])
				->setCountry($postData['country'])
				->setRoles($postData['roles']);

				$dm->persist($user);
				$dm->flush();
		}

		$data = $this->get('serializer')->serialize($user, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/users/{id}", name="admin_user_edit", methods={"DELETE"})
	 */
	public function userDelete(Request $request, DocumentManager $dm, $id): Response
	{
		$user = $dm->getRepository('App:User')
			->find($id);

		$dm->remove($user);
		$dm->flush();

		return $this->json([
			"type" => "success",
			"message" => "Entry successfully deleted !",
		]);
	}

	/**
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/orders", name="admin_order_index", methods={"GET"})
	 */
	public function ordersIndex(DocumentManager $dm): Response
	{
		$orders = $dm->getRepository('App:Order')
			->findAll();

		$data = $this->get('serializer')->serialize($orders, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}


	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/orders", name="admin_order_new", methods={"POST"})
	 */
	public function orderCreate(Request $request, DocumentManager $dm): Response
	{
		$order = new Order();
		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$order->setUser($postData['user'])
				->setDate($postData['date'])
				->setPrice($postData['price'])
				->setComponents($postData['components'])
				->setStatus($postData['status']);

				$dm->persist($order);
				$dm->flush();
		}
		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/orders/{id}", name="admin_order_view", methods={"GET"})
	 */
	public function orderView(DocumentManager $dm, $id): Response
	{
		$order = $dm->getRepository('App:Order')
			->find($id);

		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/orders/{id}", name="admin_order_edit", methods={"POST", "PUT"})
	 */
	public function orderEdit(Request $request, DocumentManager $dm, $id): Response
	{
		$order = $dm->getRepository('App:Order')
			->find($id);

		if ($request->isMethod("POST")) {
			$postData = json_decode($request->getContent(), true);
			$order->setUser($postData['user'])
				->setDate($postData['date'])
				->setPrice($postData['price'])
				->setComponents($postData['components'])
				->setStatus($postData['status']);

				$dm->persist($order);
				$dm->flush();
		}

		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	
	/**
	 * @param 					$id
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 *
	 * @return 					Response
	 *
	 * @Route("/orders/{id}", name="admin_order_edit", methods={"DELETE"})
	 */
	public function orderDelete(Request $request, DocumentManager $dm, $id): Response
	{
		$order = $dm->getRepository('App:Order')
			->find($id);

		$dm->remove($order);
		$dm->flush();

		return $this->json([
			"type" => "success",
			"message" => "Entry successfully deleted !",
		]);
	}
}
