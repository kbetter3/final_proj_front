function my_player_player() {
    $.ajax({
        url: "player",
        success: my_player_success_player
    });
}

function my_player_success_player(jobj) {
    $("#my-player-container").html("").append(jobj.tags);
}


function my_player_load() {
    $("#jquery_jplayer_1").jPlayer({
		          ready: function (event) {
			     $(this).jPlayer("setMedia", {
				title: "Bubble",
				mp3: "music?name=test",
			});
		},
		swfPath: "${rootPath}/res/jplayer/js",
		supplied: "mp3",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: false,
		toggleDuration: false
	});
}

function my_player_playmusic() {
    $("#jquery_jplayer_1").jPlayer("setMedia", {
        mp3: "member/music?musicno=" + $(this).attr("musicno")
    }).jPlayer("play");
}
