<?php

    $tenant_id = "<REPLACE-IT-WITH-YOUR-TENANT-ID>";
    $hostname = "login.microsoftonline.com";
    $url = "https://" . $hostname . "/" . $tenant_id . "/oauth2/v2.0/token";

    $data = array(
        "client_id" => "<REPLACE-IT-WITH-YOUR-CLIENT-ID>",
        "client_secret" => "<REPLACE-IT-WITH-YOUR-CLIENT-SECRET>",
        'scope' => "https://graph.microsoft.com/.default",
        'resource' => "https://graph.microsoft.com/",
        'grant_type' => "client_credentials"
    );

    $curl = curl_init($url);

    $headers = array(
        "Host: " . $hostname,
        "Content-type: application/x-www-form-urlencoded"
    );

    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
//    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($curl);



    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://graph.microsoft.com/v1.0/invitations");
    $payload = json_encode( array(
        "invitedUserEmailAddress"=> $_GET["email"],
        "inviteRedirectUrl" => "http://localhost:8080",
        "sendInvitationMessage" => true,
        "invitedUserDisplayName" => $_GET["name"]
        ));
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
    $authorization_header = "Authorization: Bearer " . json_decode($response)->access_token;
    curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization_header));
    $result = curl_exec($ch);

    curl_close($ch);


