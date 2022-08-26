class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.text     :question,   null: false
      t.text     :answer,     null: false
      t.text     :difficulty, null: false
      
      t.belongs_to :deck, null: false   
      t.timestamps null: false
    end
  end
end