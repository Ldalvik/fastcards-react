class Deck < ApplicationRecord
    validates :name,        presence: true
    validates :category,    presence: true
    validates :description, presence: true
    validates :difficulty,  presence: true
    
    has_many :cards
end