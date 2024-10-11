/** Player's cookies interface.
 *
 * @interface Cookies
 * @property {string} 'player-name' - Player's name (set in Greeting component).
 * @property {string} 'music-volume' - Music volume.
 * @property {string} score - Player's highest score.
 */
export default interface ICookies {
  'player-name': string;
  'music-volume': string;
  score: string;
}
