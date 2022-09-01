class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table   :games do |t|
      t.string     :wrong,       null: false
      t.string     :right,       null: false
      t.text       :score,       null: false
      t.belongs_to :deck,        null: false   

      t.timestamps null: false
    end
  end
end
