$(document).ready(() => {

  $(".button").click(function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let id = $(this).attr("id");

    if (id === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (id === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });

  const channels = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "oatsngoats",
    "con5a5w5w5"
  ];
  const callback = "?callback=?";
  let channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";
  let streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";

  const callAPI = () => {
      $(".main-container--channel-info").empty();
    channels.forEach(channel => {
      let channelsAPI = channelsURL + channel + callback;
      let streamsAPI = streamsURL + channel + callback;
      let displayName;
      let viewers = "offline"; // source: streamrsURL
      let status;
      let game = ""; // source: streamsURL
      let logo;
      let html;
      let desc = "";
      let url = "#";

      $.getJSON(channelsAPI, data => {
        if (data.status == 404 || data.status == 422) {
          displayName = channel;
          logo = "https://grupphaus.github.io/me2.png";
          desc = "NOT FOUND";
          viewers = "error";
        } else {
          displayName = data.display_name;
          desc = data.status;
          url = data.url;
          data.logo
            ? (logo = data.logo)
            : (logo = "https://i.imgur.com/nJ1AQg7.png");
        }

        $.getJSON(streamsAPI, data => {
          if (data.stream === null) {
            status = "offline";
          } else {
            status = "online";
            game += " @ " + data.stream.game;
            viewers = data.stream.viewers + " viewers";
          }
          html =
            "<div class='main-container--channel-info'>" +
            "<a class='" +
            status +
            "' href='" +
            url +
            "' target='_blank'><img class='logo' src='" +
            logo +
            "'/>" +
            "<h3>" +
            displayName +
            "</h3>" +
            "<p class='description'>" +
            desc +
            game +
            "</p>" +
            "<div class='status-light " +
            status +
            "-status'></div><p class='viewers'>" +
            viewers +
            "</p></a>";
            status === "online" ? $("main").prepend(html) : $("body").append(html);
        });
      });
    });
  };
  callAPI();
});
