class Route < ActiveRecord::Base
	has_many :waypoints

	def self.filterDifficulty(difficulty)
		self.where("difficulty = ?", difficulty)
	end

end
