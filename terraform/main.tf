terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

# Create a key pair for SSH access (or use an existing one)
resource "aws_key_pair" "jenkins_ssh_key" {
  key_name   = "jenkins-qrgen-key"
  public_key = file("/home/cooper/.ssh/id_rsa.pub")  # Use existing pubkey
}

resource "aws_instance" "qrgen_test" {
  ami                    = "ami-0a2e29e3b4fc39212"  # Ubuntu 22.04 LTS in ap-southeast-2
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.jenkins_ssh_key.key_name  # Assign the key pair
  vpc_security_group_ids = [aws_security_group.qrgen_sg.id]       # Assign security group

  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }

  tags = {
    Name = "qrgenTest30"
  }
}

# Security group to allow necessary ports
resource "aws_security_group" "qrgen_sg" {
  name        = "qrgen-allow-ports"
  description = "Allow access to QRGen application ports"

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Restrict to your Jenkins IP in production!
  }

  # Frontend access (port 5000)
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend access (port 3000)
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # MongoDB access (port 27017) - WARNING: This is not recommended for production!
  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "qrgen-ports-access"
  }
}

# Output the instance public IP for Ansible
output "instance_ip" {
  value = aws_instance.qrgen_test.public_ip
}