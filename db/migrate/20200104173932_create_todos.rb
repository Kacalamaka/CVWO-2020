class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :task, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
