class Card < ApplicationRecord
    validates :question,    presence: true
    validates :answer,      presence: true
    validates :clue,        presence: true
    validates :difficulty,  presence: true
    
    belongs_to :deck
end