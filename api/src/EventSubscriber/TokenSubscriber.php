<?php

namespace App\EventSubscriber;

use App\Controller\AdminAuthenticatedController;
use App\Controller\TokenAuthenticatedController;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class TokenSubscriber implements EventSubscriberInterface
{
	private $dm;

	public function __construct(DocumentManager $dm)
	{
		$this->dm = $dm;
	}

	public function onKernelController(FilterControllerEvent $event)
	{
		$controller = $event->getController();

		if (!is_array($controller)) {
			return;
		}

		$token = $event->getRequest()->get('token');

		if(isset(json_decode($event->getRequest()->getContent(), true)['token'])) {
			$token = json_decode($event->getRequest()->getContent(), true)['token'];
		}
		if (null !== $event->getRequest()->headers->get('token')) {
		    var_dump($token);
			$token = $event->getRequest()->headers->get('token');
		}

		if ($controller[0] instanceof TokenAuthenticatedController) {
			if (!$token) {
				throw new AccessDeniedHttpException('You need to be logged in !');
			}
			$user = $this->dm->getRepository('App:User')
				->findOneByApiToken($token);
			if (!$user) {
				throw new AccessDeniedHttpException('You need to be logged in !');
			}
		}

		if ($controller[0] instanceof AdminAuthenticatedController) {
			if (!$token) {
				throw new AccessDeniedHttpException('You need to be logged in !');
			}
			$user = $this->dm->getRepository('App:User')
				->findOneByApiToken($token);
			if (!$user) {
				throw new AccessDeniedHttpException('You need to be logged in !');
			}

			if (!in_array('ROLE_ADMIN', $user->getRoles())) {
				throw new AccessDeniedHttpException('You need to be admin !');
			}
		}
	}

	public static function getSubscribedEvents()
	{
		return array(
			KernelEvents::CONTROLLER => 'onKernelController',
		);
	}
}