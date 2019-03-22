<?php

namespace App\Controller;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
	/**
	 * @param DocumentManager   $dm
	 * @param Request           $request
	 *
	 * @return Response
	 *
	 * @Route("/api/search", name="api_search", methods={"GET"})
	 */
	public function index(DocumentManager $dm, Request $request): Response
	{
		$limit = 20;
		$offset = 0;
		$query = $request->query;
		$search = [];

		if ($query->has('offset'))
			$offset = $query->get('offset');
		if ($query->has('type'))
			$search['type'] = $query->get('type');
		if ($query->has('label'))
			$search['label'] = new \MongoRegex("/".$query->get('label')."/i");

		$components = $dm->getRepository('App:Component')
			->findBy($search, [], 20, $offset);

		$data = $this->get('serializer')->serialize($components, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}
}
