<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    <span>Work in progress</span>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon><ToolingIcon /></template>
    <template #heading>Tooling</template>
    <span>Things we've built</span>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon><EcosystemIcon /></template>
    <template #heading>Ecosystem</template>
    <span>Everything DreamAzul</span>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon><CommunityIcon /></template>
    <template #heading>Community</template>
    Got stuck? Ask your question on our official Discord server or at pumkeys@gmail.com
  </WelcomeItem>

  <WelcomeItem>
    <template #icon><SupportIcon /></template>
    <template #heading>Support DreamAzul</template>
    As an independent project, DreamAzul relies on community backing for its sustainability. You can
    help us by
    <a href="https://dream-azul.com/sponsor" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
