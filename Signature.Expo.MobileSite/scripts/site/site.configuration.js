/**
 * Configurations and Global Variables of the Application
 * 
 * Dependency: jquery cookie plugin
 * 
 * _rewards stores what rewards the user has
 */
(function($) {
	$.configuration = {
        // Instantiate Global Variables
		_rewards: null,



        /**
         * Returns the value of Rewards
         */
		getRewards: function() {
		    if (this._rewards == null) {
                return JSON.parse($.cookie('ABOT-rewards'));
            } else {
		        return this._rewards;
            }
		},

        /**
         * Sets the Rewards value
         */
		setRewards: function(rewards) {
		    this._rewards = rewards;
		    $.cookie('ABOT-rewards', JSON.stringify(rewards), {path: '/'});
		}
	}
})(jQuery);