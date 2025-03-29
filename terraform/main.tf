provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-08c40ec9ead489470" # Ubuntu 20.04
  instance_type = "t2.micro"
  key_name      = "my-key-pair"

  tags = {
    Name = "TaskManager-Server"
  }
}

output "instance_ip" {
  value = aws_instance.app_server.public_ip
}