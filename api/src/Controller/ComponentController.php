<?php
namespace App\Controller;

use App\Document\Component;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Doctrine\ORM\Tools\Pagination\Paginator;
use function PHPSTORM_META\type;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;

class ComponentController extends AbstractController
{
	/**
	 * @param DocumentManager $dm
	 * @param Request         $request
	 *
	 * @return Response
	 *
	 * @throws \MongoException
	 * @Route("/api/components", name="api_components", methods={"GET"})
	 */
	public function index(DocumentManager $dm, Request $request): Response
	{
		$offset = 0;
		$query = $request->query;
		$components = $dm->createQueryBuilder('App:Component');
		if ($query->has('offset'))
			$offset = $query->get('offset');
		if ($query->has('type'))
			$components->field('type')->equals(new \MongoRegex("/".$query->get('type')."/i"));
		if ($query->has('label'))
			$components->field('label')->equals(new \MongoRegex("/".$query->get('label')."/i"));
		if ($query->has('priceMin') && $query->has('priceMax'))
			$components->field('sort_value.prix')->range(intval($query->get('priceMin')."00"),intval($query->get('priceMax')."00"));
		//$components->addOr($components->expr()->field('brand')->equals('ASUS'))->addOr($components->expr()->field('brand')->equals('MSI'));
		if ($query->has('sort'))
			$sort = explode('-',$query->get('sort'));
			$components->sort([$sort[0] => $sort[1]]);
		$components->limit(20);
		$components->skip($offset);
	   $data = $this->get('serializer')->serialize($components->getQuery(), 'json');
		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}
	/**
	 * @param DocumentManager $dm
	 * @param Request         $request
	 *
	 * @return Response
	 *
	 * @throws \MongoException
	 * @Route("/api/components/howmanywithfilter", name="api_components_count_with_filter", methods={"GET"})
	 */
	public function componentsCountWithFilter(DocumentManager $dm, Request $request): Response
	{
		$query = $request->query;
		$components = $dm->createQueryBuilder('App:Component')->select('id');
		if ($query->has('type'))
			$components->field('type')->equals(new \MongoRegex("/".$query->get('type')."/i"));
		if ($query->has('label'))
			$components->field('label')->equals(new \MongoRegex("/".$query->get('label')."/i"));
		if ($query->has('priceMin') && $query->has('priceMax'))
			$components->field('sort_value.prix')->range(intval($query->get('priceMin')."00"),intval($query->get('priceMax')."00"));
		$response = new Response("{\"count\":".count($components->getQuery())."}");
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

		/**
	 * @param DocumentManager 	$dm
	 * @param Request 			$request
	 *
	 * @return Response
	 *
	 * @Route("/api/mobile", name="api_mobile", methods={"GET"})
	 */
	public function mobile(DocumentManager $dm, Request $request): Response
	{
		$limit = 20;
		$offset = 0;
		$query = $request->query;
		$search = [];

		if ($query->has('offset'))
			$offset = $query->get('offset');
		if ($query->has('type'))
			$search['type'] = new \MongoRegex("/".$query->get('type')."/i");
		if ($query->has('label'))
			$search['label'] = new \MongoRegex("/".$query->get('label')."/i");

		$components = $dm->getRepository('App:Component')
			->findBy($search, [], 20, $offset);
    
       $data = $this->get('serializer')->serialize($components, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
	}

	/**
	 * @param DocumentManager 	$dm
	 * @param Request 			$request
	 *
	 * @return Response
	 *
	 * @Route("/api/components/howmany", name="api_components_count", methods={"GET"})
	 */
	public function componentsCount(DocumentManager $dm, Request $request): Response
	{
		$query = $request->query;
		$search = [];

		if ($query->has('type'))
			$search['type'] = new \MongoRegex("/".$query->get('type')."/i");
		if ($query->has('label'))
			$search['label'] = new \MongoRegex("/".$query->get('label')."/i");

		$components = $dm->getRepository('App:Component')
			->findBy($search);

		$response = new Response("{\"count\":".count($components)."}");
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}

	/**
	 * @param 					$id
	 * @param DocumentManager 	$dm
	 *
	 * @return Response
	 * 
	 * @Route("/api/component/{id}", name="api_get_component", methods={"GET"})
	 */
	public function getComponent(DocumentManager $dm, $id): Response
	{
		$component = $dm->getRepository('App:Component')
			->find($id);

		$data = $this->get('serializer')->serialize($component, 'json');

		$response = new Response($data);
		$response->headers->set('Content-Type', 'application/json');

		return $response;
	}
}