const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  async execute(interaction) {
    const commands = await getCommands();

    const fields = commands.map(command => ({
      name: `/${command.data.name}`,
      value: command.data.description || 'No description available',
    }));
    const embed = new EmbedBuilder()
      .setTitle('🛡️ Auto-Moderation Features')
      .setDescription(`Explore the powerful auto-moderation features crafted by ${interaction.client.user.username}. these functionalities are designed to elevate your Discord server experience.`)
      .setFooter({
        text: `Please note that these features are specific to ${interaction.client.user.username}. Check the bot documentation for the most up-to-date information and customization options.`
      })
      .setTimestamp()
      .setColor('Orange');

    // commands.forEach(command => {
    //   embed.addField(`/${command.data.name}`, command.data.description || 'No description available');
    // });
    embed.addFields(fields);

    embed.addFields(
      {
        name: 'Development Support',
        value: 'Huge thanks to <@895652387782549574> for contributing to the development of this project. 🚀 Your expertise has been instrumental in making it a success!',
      },
      {
        name: 'Media Partner',
        value: 'Special thanks to our media partner, [thintry.com](https://thintry.com), for their collaboration and support. 🌐',
      }
    );

    await interaction.reply({ embeds: [embed] });
  },

  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays information about auto-moderation features.'),
};

function getCommands() {
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  const commands = [];

  for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.push(command);
  }

  return commands;
}
