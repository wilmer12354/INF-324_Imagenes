using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;


namespace imagenes
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Archivos png |* .png|Archivos jpg|*.jpg";
            openFileDialog1.ShowDialog();

            Bitmap bmp = new Bitmap(openFileDialog1.FileName);
            pictureBox1.Image = bmp;
        }

        
        private void button2_Click(object sender, EventArgs e)
        {
            if (pictureBox1.Image == null)
            {
                MessageBox.Show("Por favor, carga una imagen primero.");
                return;
            }

            Bitmap original = new Bitmap(pictureBox1.Image);
            Bitmap procesada = new Bitmap(original);

            int radius = 5; 
            int umbral = 180; 

            for (int y = 0; y < original.Height; y++)
            {
                for (int x = 0; x < original.Width; x++)
                {
                    // Obtener el color del píxel actual
                    Color pixel = original.GetPixel(x, y);

                    // Convertir a escala de grises
                    int gray = (pixel.R + pixel.G + pixel.B) / 3;

                    // Detectar píxeles brillantes
                    if (gray > umbral)
                    {
                        // Pintar el píxel actual y sus vecinos
                        for (int dy = -radius; dy <= radius; dy++)
                        {
                            for (int dx = -radius; dx <= radius; dx++)
                            {
                                int nx = x + dx;
                                int ny = y + dy;

                                // Verificar que el píxel vecino esté dentro de los límites
                                if (nx >= 0 && nx < original.Width && ny >= 0 && ny < original.Height)
                                {
                                    procesada.SetPixel(nx, ny, Color.Red);
                                }
                            }
                        }
                    }
                }
            }
            pictureBox2.Image = procesada;
        }



        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (pictureBox1.Image == null)
            {
                MessageBox.Show("Por favor, carga una imagen primero.");
                return;
            }

            Bitmap original = new Bitmap(pictureBox1.Image);
            Bitmap extraerCarretera = new Bitmap(original.Width, original.Height);

            // gris oscuro
            Color carreteraColorMin = Color.FromArgb(50, 50, 50);  
            Color carreteraColorMax = Color.FromArgb(180, 180, 180);  


            for (int y = 0; y < original.Height; y++)
            {
                for (int x = 0; x < original.Width; x++)
                {
                    Color pixel = original.GetPixel(x, y);
                    bool esVerde = pixel.G > pixel.R && pixel.G > pixel.B;

                    // Comparar el color del píxel con el rango de la carretera
                    if (pixel.R >= carreteraColorMin.R && pixel.G >= carreteraColorMin.G && pixel.B >= carreteraColorMin.B &&
                        pixel.R <= carreteraColorMax.R && pixel.G <= carreteraColorMax.G && pixel.B <= carreteraColorMax.B &&
                        !esVerde) // Añadir condición para excluir verdes
                    {

                        extraerCarretera.SetPixel(x, y, pixel);
                    }
                    else
                    {

                        extraerCarretera.SetPixel(x, y, Color.Transparent);
                    }
                }
            }

            pictureBox2.Image = extraerCarretera;
        }


    }
}
