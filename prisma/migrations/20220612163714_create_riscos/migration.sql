-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "area_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacao_controle" (
    "id" SERIAL NOT NULL,
    "rating_control_int" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avaliacao_controle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classificacoes" (
    "id" SERIAL NOT NULL,
    "classification_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impactos" (
    "id" SERIAL NOT NULL,
    "impact_int" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "impactos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "origem_risco" (
    "id" SERIAL NOT NULL,
    "risk_origin_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "origem_risco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos" (
    "id" SERIAL NOT NULL,
    "period_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "probabilidades" (
    "id" SERIAL NOT NULL,
    "probability_int" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "probabilidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "profile_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riscos" (
    "id" TEXT NOT NULL,
    "id_area" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_types_origin" INTEGER NOT NULL,
    "id_risk_origin" INTEGER NOT NULL,
    "indication_origin" TEXT NOT NULL,
    "id_period" INTEGER NOT NULL,
    "event_risk" TEXT NOT NULL,
    "cause_risk" TEXT NOT NULL,
    "consequence_risk" TEXT NOT NULL,
    "id_category" INTEGER NOT NULL,
    "existing_controls" TEXT NOT NULL,
    "id_probability" INTEGER NOT NULL,
    "id_impact" INTEGER NOT NULL,
    "inherement_risk" TEXT NOT NULL,
    "id_rating_control" INTEGER NOT NULL,
    "residual_risk" TEXT NOT NULL,
    "id_classification" INTEGER NOT NULL,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "justification" TEXT NOT NULL,
    "id_types_treatment" INTEGER NOT NULL,
    "treatment_measures" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "id_status" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "riscos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "probability_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_origem" (
    "id" SERIAL NOT NULL,
    "types_origin_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipos_origem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_tratamento" (
    "id" SERIAL NOT NULL,
    "types_tretament_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipos_tratamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_profile" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_id_profile_key" ON "users"("id", "id_profile");

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_area_fkey" FOREIGN KEY ("id_area") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_rating_control_fkey" FOREIGN KEY ("id_rating_control") REFERENCES "avaliacao_controle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_classification_fkey" FOREIGN KEY ("id_classification") REFERENCES "classificacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_impact_fkey" FOREIGN KEY ("id_impact") REFERENCES "impactos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_risk_origin_fkey" FOREIGN KEY ("id_risk_origin") REFERENCES "origem_risco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_period_fkey" FOREIGN KEY ("id_period") REFERENCES "periodos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_probability_fkey" FOREIGN KEY ("id_probability") REFERENCES "probabilidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_types_origin_fkey" FOREIGN KEY ("id_types_origin") REFERENCES "tipos_origem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_types_treatment_fkey" FOREIGN KEY ("id_types_treatment") REFERENCES "tipos_tratamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riscos" ADD CONSTRAINT "riscos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
