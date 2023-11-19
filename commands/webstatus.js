const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('webstatus')
    .setDescription('Check if a website or API is up or down')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Enter the URL to check')
        .setRequired(true)
    ),

  async execute(interaction) {
    const websiteURL = interaction.options.getString('url');

    try {
      const response = await axios.get(websiteURL);
      if (response.status === 200) {
        const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle(`Website Status: UP`)
          .setDescription(`The website ${websiteURL} is UP!`);

        await interaction.reply({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle(`Website Status: DOWN`)
          .setDescription(`The website ${websiteURL} is DOWN!`);

        await interaction.reply({ embeds: [embed] });
        await interaction.user.send(`Alert: The website ${websiteURL} is DOWN!`);
      }
    } catch (error) {
      console.error('Error checking website status:', error);
      const embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Website Status: DOWN`)
        .setDescription(`The website ${websiteURL} is DOWN!`);

      await interaction.reply({ embeds: [embed] });
      await interaction.user.send(`Alert: The website ${websiteURL} is DOWN!`);
    }
  },
};