<?php

namespace App\Controller;

use App\Document\Order;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
	/**
	 * @Route("/api/order", name="order")
	 */
	public function index(Request $request, DocumentManager $dm)
	{
		$user = $dm->getRepository('App:User')
			->findOneByApiToken($request->get('token'));

		$order = $dm->getRepository('App:Order')
			->findByUser($user);

		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request           $request
	 * @param DocumentManager   $dm
	 * 
	 * @return                  Response | json
	 *
	 * @Route("/api/order", name="order_add", methods={"POST"})
	 */
	public function orderAdd(Request $request, DocumentManager $dm)
	{
		$postData = json_decode($request->getContent(), true);
		
		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);
		if (!$user && filter_var($postData['token'], FILTER_VALIDATE_IP)) {
			$user = $postData['token'];
		} else { return $this->json(['type' => 'error', 'message' => 'Invalid user']); }

		$order = new Order();

		$order->setUser($user)
			->setPrice($postData['price'])
			->setDate(date("Y-m-d H:i:s"))
			->setComponents($postData['basket'])
			->setStatus("waiting");

		$dm->persist($order);
		$dm->flush();
		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request           $request
	 * @param DocumentManager   $dm
	 * @param 					$id
	 * 
	 * @return                  Response | json
	 *
	 * @Route("/api/order/{id}/edit", name="order_edit", methods={"POST"})
	 */
	public function orderUpdate(Request $request, DocumentManager $dm, $id)
	{
		$postData = json_decode($request->getContent(), true);

		$order = $dm->find($id, 'App:Order');

		$order->setStatus($postData['status']);

		$dm->persist($order);
		$dm->flush();
		
		$data = $this->get('serializer')->serialize($order, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}
}
