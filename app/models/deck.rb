class Deck < ApplicationRecord
    validates :name,        presence: true
    validates :category,    presence: true
    validates :description, presence: true
    validates :difficulty,  presence: true
    
end