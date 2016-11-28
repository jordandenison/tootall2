# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # Assign a friendly name to this host VM
  config.vm.hostname = "docker-host"

  # Skip checking for an updated Vagrant box
  config.vm.box_check_update = false

  # Always use Vagrant's default insecure key
  config.ssh.insert_key = false

  # Spin up a "host box" for use with the Docker provider
  # and then provision it with Docker
  config.vm.provision "docker"

  # Disable synced folders (prevents an NFS error on "vagrant up")
  config.vm.synced_folder ".", "/opt/app"

  config.vm.provider "docker" do |d|
    d.build_dir = "."
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 3001, host: 3001
  config.vm.network "forwarded_port", guest: 3002, host: 3002

end
