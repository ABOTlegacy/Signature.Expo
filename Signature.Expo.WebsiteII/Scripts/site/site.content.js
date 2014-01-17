/**
 * Content is in charge of display several of the dispaly parts of the website.
 */
(function($) {
	$.content = {
		



        /**
         * Returns the value of Rewards
         */
		generateTiles: function() {
		    if (this._rewards == null) {
                return JSON.parse($.cookie('ABOT-rewards'));
            } else {
		        return this._rewards;
            }
		}
	}
})(jQuery);