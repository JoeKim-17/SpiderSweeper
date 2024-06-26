import HighScoreTable from "../components/highscoretable.js";
import { NavbarHighScorePage } from "../components/navbar.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { fetchhighscores } from "../api/fetch-test.js";

const HighScorePage = async () => {
  return (
    `<section id="highscores" class="page">
    ` +
    NavbarHighScorePage() +
    HowToPlayDialog() +
    HighScoreTable(await fetchhighscores()) +
    `
    </section>`
  );
};

export default HighScorePage;
