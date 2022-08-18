class CreateDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :decks do |t|
      t.string   :name,        null: false
      t.string   :category,    null: false
      t.text     :description, null: false
      t.string   :difficulty,  null: false

      t.timestamps null: false
    end
  end
end
