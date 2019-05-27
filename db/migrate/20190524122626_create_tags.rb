class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :color

      t.timestamps
    end

    Tag.create(
      [
        { name: 'Ruby on Rails', color: 'red' },
        { name: 'Rspec/Capybara', color: 'red' },
        { name: 'Docker', color: 'blue' },
        { name: 'Nginx', color: 'green' },
        { name: 'PostgreSQL', color: 'blue' },
        { name: 'Tutorial', color: 'green' }
      ]
    )
  end
end
