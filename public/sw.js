self.addEventListener('push', (event) => {
  let data = { title: 'Notification', body: 'Vous avez reçu une notification.' };
  try {
    data = event.data.json();
  } catch (e) {
    // Données non-JSON : on garde le fallback.
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      image: data.image,
      tag: data.tag,
      requireInteraction: data.requireInteraction,
      data: data.data,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
