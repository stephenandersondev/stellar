Rails.application.routes.draw do
  resources :resources, only: [:update, :destroy, :create]
  resources :users
  resources :messages
  resources :projects
  
  
  get '/resources/init', to: 'resources#init'
  post '/resources/search', to: 'resources#search'
  post '/auth', to: 'auth#create'
end
