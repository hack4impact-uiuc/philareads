import os


class Config:
    SECRET_KEY = "testkey"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOG_FILE = "api.log"


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgres://vnddrsbqdqwlcg:e8e140ed3dc91cfd8ee0ed5d96b682cbce780d3c9df641f6149deb224a8cba78@ec2-50-19-249-121.compute-1.amazonaws.com:5432/df77q7prer3css"
    # SQLALCHEMY_DATABASE_URI = 'postgres://127.0.0.1:5432'
    DEBUG = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    DEBUG = False


class DockerDevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://testusr:password@postgres/testdb"
    DEBUG = True


config = {"dev": DevelopmentConfig, "prod": ProductionConfig, "docker": DockerDevConfig}
