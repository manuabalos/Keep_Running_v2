class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|

    	t.string :name
    	t.text :description
    	t.string :location
    	t.string :difficulty
    	t.float :distance
    	t.float :latitude
    	t.float :longitude

      t.timestamps null: false
    end
  end
end
