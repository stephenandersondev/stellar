class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create 
        @user = User.create(
            username:params[:username],
            password:params[:password],
            project_id:params[:project_id]
        )
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: { user: @user, jwt: @token }, status: :created
        else 
            render json: { error: 'failed to create user' }, status: :not_acceptable 
        end 
    end 


end
