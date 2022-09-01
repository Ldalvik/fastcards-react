class Api::V1::GamesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def create
        game = Game.new(game_params)
        game.deck_id = params[:deck_id]
        
        if game.save
            render json: game
        else
            render json: {error: game.errors.full_messages}, status: :unprocessable_entity            
        end
    end

    private

    def game_params
        params.require(:game).permit(:right, :wrong, :score)
    end
end