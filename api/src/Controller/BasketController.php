<?php

namespace App\Controller;

use App\Controller\TokenAuthenticatedController;
use App\Document\Basket;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Query\Query;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BasketController extends AbstractController implements TokenAuthenticatedController
{
    /**
     * @Route("/basket", name="basket")
     */
    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/BasketController.php',
        ]);
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 * 
	 * @return 					Response
	 *
	 * @Route("/api/basket/add", name="basket_add", methods={"POST"})
	 */
	public function basketAdd(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);

		$price = $dm->find('App:Component', $postData["component"]);
		if (!$price)
			return $this->json(["type" => "error", "message" => "Unknown component"]);
		$price = $price->getSortValue()['prix'];

		$basket = $dm->getRepository('App:Basket')
			->findOneByUser($user->getId());
		if ($basket == null) {
			$basket = new Basket();
			$basket->setUser($user->getId());
		}
		$basket->addBasket($postData['component'], $price);

		$dm->persist($basket);
		$dm->flush();
		$data = $this->get('serializer')->serialize($basket, 'json');

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
	 * @Route("/api/basket/remove", name="basket_remove", methods={"POST"})
	 */
	public function basketRemove(Request $request, DocumentManager $dm): Response
	{
		$postData = json_decode($request->getContent(), true);

		$user = $dm->getRepository('App:User')->findOneByApiToken($postData['token']);

		$price = $dm->find('App:Component', $postData["component"]);
		if (!$price)
			return $this->json(["type" => "error", "message" => "Unknown component"]);
		$price = $price->getSortValue()['prix'];

		$basket = $dm->getRepository('App:Basket')
			->findOneByUser($user->getId());
		if ($basket == null) {
			return $this->json(["type" => "error", "message" => "Empty basket"]);
		}
		$basket->removeBasket($postData['component'], $price);

		$dm->persist($basket);
		$dm->flush();
		$data = $this->get('serializer')->serialize($basket, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param Request 			$request
	 * @param DocumentManager 	$dm
	 * @param 					$token
	 * 
	 * @return 					Response
	 *
	 * @Route("/api/basket/{token}", name="basket_get", methods={"GET"})
	 */
	public function basketGet(Request $request, DocumentManager $dm, $token): Response
	{
		$user = $dm->getRepository('App:User')
			->findOneByApiToken($token);

		$basket = $dm->getRepository('App:Basket')->findOneByUser($user->getId());

		$data = $this->get('serializer')->serialize($basket, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}
}
