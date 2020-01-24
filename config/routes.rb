Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'todos/index'
      post 'todos/create'
      get '/show/:id', to: 'todos#show'
      delete '/destroy/:id', to:'todos#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end

