<?php
require __DIR__ . '/vendor/autoload.php';

if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Calendar API PHP Quickstart');
    $client->setScopes(Google_Service_Calendar::CALENDAR);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Calendar($client);

// //create event
// $event = new Google_Service_Calendar_Event(array(
//   'summary' => 'Test Event',
//   'description' => 'Test Event',
//   'start' => array(
//     'dateTime' => '2018-10-14T09:00:00-07:00'
//   ),
//   'end' => array(
//     'dateTime' => '2018-10-16T09:00:00-07:00'
//   )
// ));

// // $calendarId = 'j85tnbuj1e5tgnizqt9faf2i88@group.calendar.google.com';
// $calendarId = 'buffalo.edu_aeqqrlekluf3aa8rhn5c2mecqo@group.calendar.google.com';
// $event = $service->events->insert($calendarId, $event);
// printf('Event created: %s\n', $event->htmlLink);


$event = new Google_Service_Calendar_Event(array(
  'summary' => 'Test Event',
  'location' => 'UB',
  'description' => 'A chance to hear more about UB events.',
  'start' => array(
    'dateTime' => '2018-11-28T09:00:00-07:00',
    'timeZone' => 'America/Los_Angeles',
  ),
  'end' => array(
    'dateTime' => '2018-11-28T17:00:00-07:00',
    'timeZone' => 'America/Los_Angeles',
  ),
  'recurrence' => array(
    'RRULE:FREQ=DAILY;COUNT=2'
  ),
  'attendees' => array(
    array('email' => 'kchikte@buffalo.edu'),
    array('email' => 'vijayaha@buffalo.edu'),
  ),
  'reminders' => array(
    'useDefault' => FALSE,
    'overrides' => array(
      array('method' => 'email', 'minutes' => 24 * 60),
      array('method' => 'popup', 'minutes' => 10),
    ),
  ),
));

// $calendarId = 'buffalo.edu_aeqqrlekluf3aa8rhn5c2mecqo@group.calendar.google.com';
// $calendarId = 'p12jf9c13r4eu8k0i5nbq5aojc@group.calendar.google.com';
$calendarId = 'primary';
$calendarList = $service->calendarList->listCalendarList();
// $calendarListEntry = $service->calendarList->get('calendarId');
// $calendarId = $service->calendarList->calendarId();
// print_r($calendarList);

$event = $service->events->insert($calendarId, $event);
printf('Event created: %s\n', $event->htmlLink);