class Game < ApplicationRecord
    validates :right,  presence: true
    validates :wrong,  presence: true
    validates :score,  presence: true
    
    belongs_to :deck
end