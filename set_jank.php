<?php
if(!empty($_POST['jank'])) {
	if(empty($_POST['mode'])) {
		$jank = floatval($_POST['jank']);
	}
	else {
		$currentJank = file_get_contents('jankness.txt');
		$newJank = floatval($_POST['jank']);
		if($_POST['mode'] == "add") {
			$jank = $currentJank + $newJank;
			if($jank > 1000) {
				$jank = 1000;
			}
		}
		else if($_POST['mode'] == "subtract") {
			$jank = $currentJank - $newJank;
			if($jank < 0) {
				$jank = 0;
			}
		}
		else {
			echo "you must add or subtract";
			exit(0);
		}
	}
	if($jank >= 0 && $jank <=1000) {
		file_put_contents("/var/www/html/mob_jank_gauge/jankness_log.txt", $jank . "\n", FILE_APPEND);
		file_put_contents("/var/www/html/mob_jank_gauge/jankness.txt", $jank);
		echo "Jank updated";
	}
	else echo "jank out of range";
}
else echo "Set jank parameter to 0 - 1000";
?>
