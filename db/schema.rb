# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140105164150) do

  create_table "blogs", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.integer  "like_count", :default => 1
  end

  create_table "blogs_tags", :force => true do |t|
    t.integer "blog_id"
    t.integer "tag_id"
  end

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "blog_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "picture_id"
    t.string   "website"
    t.string   "commenter",  :null => false
    t.string   "email",      :null => false
    t.string   "gravatar"
  end

  add_index "comments", ["blog_id"], :name => "index_comments_on_blog_id"
  add_index "comments", ["picture_id"], :name => "index_comments_on_picture_id"

  create_table "pics_tags", :force => true do |t|
    t.integer "picture_id"
    t.integer "tag_id"
  end

  create_table "pictures", :force => true do |t|
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "avatar"
  end

  create_table "pictures_tags", :force => true do |t|
    t.integer "picture_id"
    t.integer "tag_id"
  end

  create_table "tags", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "remember_token"
    t.string   "website"
  end

  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
