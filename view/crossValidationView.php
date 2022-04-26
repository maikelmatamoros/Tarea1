<?php 
    include_once 'public/header.php';
?>
<section id="contenido">
    <br>
    <br>
    <button class="button">Generar 10-Fold Cross-Validation</button>
    <br>
    <table style="text-align: left; width: 100%; border="1" cellpadding="2" cellspacing="2">
        <tbody id="table-content">
            <tr>
                <td>Bloque</td>
                <td>Correctos</td>
                <td>Erroneos</td>
                <td>Porcentaje</td>
            </tr>
            <template id="template-fila">
                <tr class="fila">
                    <td id="bloque"></td>
                    <td id="buenos"></td>
                    <td id="malos"></td>
                    <td id="total"></td>
                </tr>
            </template>
        </tbody>
    </table>
        
    <br>
    <div class="resultado"></div>
</section>
<script type="text/javascript" src="public\js\crossValidation.js"></script>
<?php 
include_once 'public/footer.php';
?>