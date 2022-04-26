<?php 
include_once 'public/header.php';
?>

<section id="contenido">
        <br>
        <h2 style="text-align: center;">Adivinar el recinto de origen</h2>
        <form">
            <div class="row">
                <div class="form-group-col">
                    <p>Estilo de Aprendizaje</p>
                    <select id="estilo" name="estilo">
                        <option value="1">Divergente</option>
                        <option value="2">Convergente</option>
                        <option value="3">Asimilador</option>
                        <option value="4">Acomodador</option>
                    </select>

                </div>
                <div class="form-group-col">
                    <p>Sexo</p>
                        <select id="sexo" name="sexo">
                            <option value="1">Femenino</option>
                            <option value="2">Masculino</option>
                        </select>
                </div>
            </div>
			<br>
            <div class="row">
                <div class="form-group-col">
                    <p>Promedio para Matrícula</p>
                    <input type="text" id="promedio" name="promedio" placeholder="Ejem: 8.5">
                </div>
            </div>
        </form>
		<br>
        <div class="buttonForms">
            <button class="button">Adivinar Recinto</button>
        </div>
        <div id="resultado"></div>
        <script type="text/javascript" src="public/js/determinarRecintoOrigen.js"></script>
</section>

<?php 
include_once 'public/footer.php';
?>