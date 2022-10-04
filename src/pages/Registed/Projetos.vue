<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <TipoProjetoSelector
            :tipos="tipos"
            :tipo="tipo"
            @tipo_projeto_updated="tipoProjetoUpdated"
            clearable
            dense
            class="col-xs-12 col-md-3"
          />

          <q-select
            v-model="pais"
            :options="paises"
            label="País"
            outlined
            dense
            class="col-xs-12 col-md-3"
            clearable
          />

          <BancoSelector
            :bancos="bancos"
            :banco="banco"
            @banco_updated="bancoUpdated"
            clearable
            class="col-xs-12 col-md-3"
          />

          <q-input
            v-model="filtroProjeto"
            label="Projeto"
            debounce="500"
            outlined
            dense
            clearable
            class="col-xs-12 col-md-3"
          />

          <q-input
            v-model="filtro"
            label="Pesquisa livre"
            debounce="500"
            outlined
            dense
            class="col-xs-12"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Projetos"
      ref="tableRef"
      selection="none"
      no-data-label="Não existem dados"
      no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
      row-key="id"
      wrap-cells
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest"
      @row-dblclick="onProjectDlbClick"
    >
      <template v-slot:top-right>
        <q-btn-toggle
          v-model="actionFilterMain"
          no-caps
          rounded
          clearable
          toggle-color="positive"
          :options="accoesCliente"
          v-if="!permissaoEdicao"
        >
          <template v-slot:one>
            <div class="row items-center">
              <div class="col-12 text-center">Com interesse</div>
              <div style="height: 4px" class="col-12 bg-accent"></div>
            </div>
          </template>
          <template v-slot:two>
            <div class="row items-center">
              <div class="col-12 text-center">Sem interesse</div>
              <div style="height: 4px" class="col-12 bg-primary"></div>
            </div>
          </template>
          <template v-slot:three>
            <div class="row items-center">
              <div class="col-12 text-center">Preciso apoio</div>
              <div style="height: 4px" class="col-12 bg-warning"></div>
            </div>
          </template>
          <template v-slot:four>
            <div class="row items-center">
              <div class="col-12 text-center">Não respondi</div>
              <div style="height: 4px" class="col-12 bg-blue-grey-2"></div>
            </div>
          </template>
        </q-btn-toggle>

        <q-btn-group outline v-if="permissaoEdicao">
          <q-btn
            label="Novo"
            @click="onNovo"
            :icon="mdiPlusBoxOutline"
            color="positive"
          />
          <q-btn @click="refresh" :icon="mdiRefresh" outline color="positive" />
        </q-btn-group>
      </template>

      <template v-slot:body-cell-referencia="props">
        <q-td :props="props">
          <q-btn
            :label="props.row.referencia"
            @click="openProjectLink(props.row)"
            flat
            rounded
            style="min-width: 150px"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-bancologo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.bancologo)" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ props.row.data.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-data_fecho="props">
        <q-td :props="props">
          {{ props.row.data_fecho.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-banco_id="props">
        <q-td :props="props" auto-width>
          {{ getBanco(props.row.banco_id) }}
        </q-td>
      </template>

      <template v-slot:body-cell-link="props">
        <q-td :props="props" auto-width>
          <q-btn
            dense
            flat
            color="positive"
            :icon="mdiOpenInNew"
            @click="openProjectLink(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiDotsVertical">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="onEditProject(props.row)"
                  v-if="permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiPencil" />
                  </q-item-section>
                  <q-item-section>Editar</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="onViewProject(props.row)"
                  v-if="!permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiEye" />
                  </q-item-section>
                  <q-item-section>Ver detalhes</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="getSentEmails(props.row)"
                  v-if="permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiEmail" />
                  </q-item-section>
                  <q-item-section>Emails Enviados</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="getInteresses(props.row)"
                  v-if="!permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiCheckAll" />
                  </q-item-section>
                  <q-item-section>Empresas interessadas</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-accent">
          <q-icon size="xl" :name="mdiAlertDecagram" class="q-mr-md" />
          <h3>
            {{ message }}
          </h3>
        </div>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEmailsEnviados">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <div class="text-h6">
            <q-chip color="positive" text-color="white">
              {{ projeto.referencia }}
            </q-chip>
            {{ projeto.nome }}
          </div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-table
            class="q-mt-sm"
            color="positive"
            title="Emails enviados"
            ref="tableActionsRef"
            selection="none"
            flat
            bordered
            no-data-label="Não existem dados"
            no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
            row-key="id"
            wrap-cells
            :rows="emailsEnviados"
            :columns="columnsSentEmails"
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            :loading="loadingSentEmails"
          >
            <template v-slot:top-right>
              <q-btn-toggle
                v-model="actionFilter"
                no-caps
                rounded
                clearable
                toggle-color="grey-8"
                :options="accoes"
              >
                <template v-slot:one>
                  <div class="row items-center">
                    <div class="col-12 text-center">Com interesse</div>
                    <div style="height: 4px" class="col-12 bg-accent"></div>
                  </div>
                </template>
                <template v-slot:two>
                  <div class="row items-center">
                    <div class="col-12 text-center">Sem interesse</div>
                    <div style="height: 4px" class="col-12 bg-primary"></div>
                  </div>
                </template>
                <template v-slot:three>
                  <div class="row items-center">
                    <div class="col-12 text-center">Precisa apoio</div>
                    <div style="height: 4px" class="col-12 bg-yellow"></div>
                  </div>
                </template>
                <template v-slot:four>
                  <div class="row items-center">
                    <div class="col-12 text-center">Não respondeu</div>
                    <div
                      style="height: 4px"
                      class="col-12 bg-blue-grey-2"
                    ></div>
                  </div>
                </template>
                <template v-slot:five>
                  <div class="row items-center">
                    <div class="col-12 text-center">Abriu link</div>
                    <div style="height: 4px" class="col-12 bg-blue"></div>
                  </div>
                </template>
                <template v-slot:six>
                  <div class="row items-center">
                    <div class="col-12 text-center">Empresa contatada</div>
                    <div style="height: 4px" class="col-12 bg-blue"></div>
                  </div>
                </template>
              </q-btn-toggle>
            </template>
            <template v-slot:body-cell-accao="props">
              <q-td :props="props" auto-width>
                <q-btn
                  round
                  size="xs"
                  class="shadow-10"
                  :color="corAccao(props.row.accao)"
                  @click="filtraAccao(props.row.accao)"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-empresa_contatada="props">
              <q-td :props="props">
                <q-checkbox
                  v-model="props.row.empresa_contatada"
                  color="blue"
                  disable
                />
              </q-td>
            </template>
            <template v-slot:body-cell-abriu_link_banco="props">
              <q-td :props="props">
                <q-checkbox
                  v-model="props.row.abriu_link_banco"
                  color="blue"
                  disable
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="mostraInteresse">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <div class="text-h6">
            <q-chip color="positive" text-color="white">
              {{ projeto.referencia }}
            </q-chip>
            {{ projeto.nome }}
          </div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-table
            class="q-mt-sm"
            color="positive"
            title="Manifestações interesse"
            ref="tableInteresses"
            selection="none"
            flat
            bordered
            no-data-label="Não existem dados"
            no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
            row-key="id"
            wrap-cells
            :rows="manifestacoesInteresse"
            :columns="columnsIteresses"
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            :loading="loadingSentEmails"
          >
            <template v-slot:top-right>
              <div class="row items-center">
                <div class="col-12 text-center">Com interesse</div>
                <div style="height: 4px" class="col-12 bg-accent"></div>
              </div>
            </template>
            <template v-slot:body-cell-accao="props">
              <q-td :props="props" auto-width>
                <q-btn
                  round
                  size="xs"
                  class="shadow-10"
                  :color="corAccao(props.row.accao)"
                  @click="filtraAccao(props.row.accao)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mdiPencil,
  mdiPlusBoxOutline,
  mdiRefresh,
  mdiAlertDecagram,
  mdiGridLarge,
  mdiOpenInNew,
  mdiEye,
  mdiDotsVertical,
  mdiEmail,
  mdiWindowClose,
  mdiCheckAll,
} from "@quasar/extras/mdi-v6";
import { defineComponent, ref, onMounted, watch } from "vue";
import { date, useQuasar } from "quasar";
import { get, post, postAuth, getAuth, apiPublicUrl } from "boot/api";
import { accoes, accoesCliente, corAccao } from "src/models/accoes-projetos";
import { useRoute, useRouter } from "vue-router";
import ProjectEditor from "src/components/Registed/Projeto.vue";
import ProjectView from "src/components/Registed/ProjetoView.vue";
import BancoSelector from "src/components/BancoSelector.vue";
import TipoProjetoSelector from "src/components/TipoProjetoSelector.vue";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $route = useRoute();
    const $router = useRouter();
    const tableRef = ref(null);
    const tableActionsRef = ref(null);
    const loading = ref(false);
    const loadingSentEmails = ref(false);
    const permissaoEdicao = ref(false);
    const mostraEmailsEnviados = ref(false);
    const mostraInteresse = ref(false);
    onMounted(async () => {
      try {
        const result = await getAuth("utilizadores/editor.php?m=2");
        permissaoEdicao.value = result.editor;
      } catch {}
      try {
        tipos.value = await get("tiposprojeto/read-ativo.php");
      } catch {
        $q.notify({
          message: "Não foi possível obter os tipos de projeto",
          type: "warning",
        });
      }
      try {
        paises.value = await get("paises/read.php");
      } catch (error) {
        $q.notify({
          message: "Não foi possível obter os países",
          type: "warning",
        });
      }
      try {
        bancos.value = await get("bancos/read-ativo.php");
      } catch {
        $q.notify({
          message: "Não foi possível obter os bancos",
          type: "warning",
        });
      }
      if (permissaoEdicao.value === false) {
        // get the base filter for this user: tipos_projeto to apply
        tipo.value = await getAuth("empresas/read-tipos-projeto.php");
      }
      tableRef.value.requestServerInteraction();
      const projetoId = parseInt($route.query.id);
      if (projetoId > 0) {
        // clear the route query id
        $router.replace({ query: null });
        // abrir o projeto
        onViewProject({ id: projetoId });
      }
    });
    let paises = ref([]);
    const pais = ref(null);
    const bancos = ref([]);
    const banco = ref(null);
    const tipos = ref([]);
    const tipo = ref(null);
    const filtroProjeto = ref(null);
    const filtro = ref(null);
    const actionFilter = ref(0);
    const actionFilterMain = ref(null);
    watch(pais, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    watch(actionFilter, (_current, _old) => {
      getSentEmails();
    });
    watch(actionFilterMain, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    watch(banco, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    watch(tipo, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    watch(filtroProjeto, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    watch(filtro, (_current, _old) => {
      tableRef.value.requestServerInteraction();
    });
    const projetos = ref([]);
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null,
    });
    const projetoEscolhido = ref([]);
    const projeto = ref({});
    const emailsEnviados = ref([]);
    const manifestacoesInteresse = ref([]);

    const tipoProjetoUpdated = (e) => {
      tipo.value = e;
    };
    const bancoUpdated = (e) => {
      if (e !== undefined) banco.value = e;
    };
    const logobanco = (logo) => {
      return apiPublicUrl(logo);
    };
    const refresh = () => {
      tableRef.value.requestServerInteraction();
    };
    const onNovo = () => {
      const p = {
        id: 0,
        nome: "",
        tipos: [],
        pais: null,
        banco_id: null,
        ativo: true,
        referencia: "",
        data: date.formatDate(new Date(), "YYYY-MM-DD"),
        descricao: "",
      };
      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: p,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value,
        },
      }).onOk(async () => {
        tableRef.value.requestServerInteraction();
      });
    };
    const onEditProject = (project) => {
      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: project,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value,
        },
      }).onOk(async () => {
        tableRef.value.requestServerInteraction();
      });
    };
    const onViewProject = (project) => {
      $q.dialog({
        component: ProjectView,
        componentProps: {
          p: project,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value,
          mostraAccoes: !permissaoEdicao.value,
        },
      }).onOk(async () => {
        tableRef.value.requestServerInteraction();
      });
    };
    const onProjectDlbClick = (_evt, row) => {
      if (row !== null) {
        if (permissaoEdicao.value === true) {
          onEditProject(row);
        } else {
          onViewProject(row);
        }
      }
    };
    const onServerRequest = async (props) => {
      try {
        loading.value = true;
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        const result = await post("projetos/read.php", {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filterProject: filtroProjeto.value,
          filter: filtro.value,
          pais: pais.value,
          banco_id: banco.value,
          tipo_id: tipo.value,
          accao: actionFilterMain.value,
        });
        projetos.value = result.rows;
        pagination.value.rowsNumber = result.count;
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;
      } catch (e) {
        $q.notify({
          message: "Não foi possível obter os projetos",
          type: "warning",
        });
      }
      loading.value = false;
    };
    const openProjectLink = async (row) => {
      await postAuth("projetos/update-link-opened.php", { projeto_id: row.id });
      window.open(row.link, "_blank");
    };
    const getBanco = (id) => {
      return bancos.value.find((p) => p.id === id).codigo;
    };
    const getSentEmails = async (p) => {
      if (typeof p !== "undefined") {
        projeto.value = p;
      }
      mostraEmailsEnviados.value = true;
      try {
        loadingSentEmails.value = true;
        const result = await postAuth("projetos/read-sent-emails-project.php", {
          projeto_id: projeto.value.id,
          accao: actionFilter.value,
          nome: "",
        });
        emailsEnviados.value = result;
      } catch (e) {
        $q.notify({
          message: "Não foi possível obter os emails enviados",
          type: "warning",
        });
      }
      loadingSentEmails.value = false;
    };
    const getInteresses = async (p) => {
      if (typeof p !== "undefined") {
        projeto.value = p;
      }
      mostraInteresse.value = true;
      try {
        loadingSentEmails.value = true;
        const result = await postAuth("projetos/read-empresas-interesse.php", {
          projeto_id: projeto.value.id,
        });
        manifestacoesInteresse.value = result;
      } catch (e) {
        $q.notify({
          message: "Não foi possível obter as manifestações de interesse",
          type: "warning",
        });
      }
      loadingSentEmails.value = false;
    };
    const filtraAccao = (accao) => {
      if (actionFilter.value === null || actionFilter.value === 0)
        actionFilter.value = accao;
      else actionFilter.value = null;
    };
    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiRefresh,
      mdiAlertDecagram,
      mdiGridLarge,
      mdiEye,
      mdiOpenInNew,
      mdiDotsVertical,
      mdiEmail,
      mdiWindowClose,
      mdiCheckAll,
      loading,
      loadingSentEmails,
      permissaoEdicao,
      mostraEmailsEnviados,
      mostraInteresse,
      pagination,
      tableRef,
      tableActionsRef,
      tipos,
      tipo,
      paises,
      pais,
      bancos,
      banco,
      filtroProjeto,
      filtro,
      projetos,
      projeto,
      emailsEnviados,
      manifestacoesInteresse,
      projetoEscolhido,
      actionFilter,
      actionFilterMain,
      accoes,
      accoesCliente,
      columns: [
        {
          name: "nome_tipo",
          label: "Tipo",
          field: "nome_tipo",
          align: "center",
        },
        {
          name: "referencia",
          label: "Referência",
          field: "referencia",
          align: "left",
        },
        { name: "nome", label: "Nome", field: "nome", align: "left" },
        {
          name: "data",
          label: "Data",
          field: "data",
          align: "left",
          style: "width: 100px",
        },
        {
          name: "data_fecho",
          label: "Data Fecho",
          field: "data_fecho",
          align: "left",
          style: "width: 100px",
        },
        {
          name: "tipo_aviso",
          label: "Tipo",
          field: "tipo_aviso",
          align: "left",
        },
        {
          name: "estado",
          label: "Estado",
          field: "estado",
          align: "left",
        },
        {
          name: "cliente",
          label: "Agência executora",
          field: "cliente",
          align: "left",
        },
        { name: "setor", label: "Setor", field: "setor", align: "left" },
        { name: "pais", label: "País", field: "pais", align: "left" },
        {
          name: "banco_id",
          label: "Banco",
          field: "banco_id",
          align: "center",
        },
        { name: "bancologo", label: "", field: "bancologo", align: "center" },
        { name: "link", label: "", field: "link", align: "center" },
        { name: "actions", label: "", field: "actions", align: "center" },
      ],
      columnsSentEmails: [
        { name: "nome", label: "Empresa", field: "nome", align: "left" },
        { name: "accao", label: "Açcão", field: "accao", align: "center" },
        {
          name: "abriu_link_banco",
          label: "Abriu link",
          field: "abriu_link_banco",
          align: "center",
        },
        {
          name: "empresa_contatada",
          label: "Empresa contatada",
          field: "empresa_contatada",
          align: "center",
        },
        {
          name: "emails_enviados",
          label: "Emails enviados",
          field: "emails_enviados",
          align: "right",
        },
      ],
      columnsIteresses: [
        { name: "nome", label: "Empresa", field: "nome", align: "left" },
        { name: "accao", label: "Açcão", field: "accao", align: "center" },
      ],
      logobanco,
      refresh,
      onNovo,
      onEditProject,
      onViewProject,
      onProjectDlbClick,
      onServerRequest,
      openProjectLink,
      getBanco,
      getSentEmails,
      getInteresses,
      corAccao,
      filtraAccao,
      tipoProjetoUpdated,
      bancoUpdated,
    };
  },
  components: { BancoSelector, TipoProjetoSelector },
});
</script>
